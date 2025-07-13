"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { createOrganization } from "../api/organization/createOrganization";
import { getOrganizations } from "../api/organization/getOrganizations";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any>([]);
  const [newOrg, setNewOrg] = useState({ name: "", description: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await getOrganizations();
      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        return;
      }
      setOrganizations(data);
    };
    fetchOrganizations();
  }, []);

  const handleCreateOrganization = async () => {
    const userId: any = JSON.parse(localStorage.getItem("user") ?? "")?.id;
    const newOrganization: any = {
      name: newOrg.name,
      description: newOrg.description,
      userId: Number(userId),
    };
    setNewOrg({ name: "", description: "" });
    const response = await createOrganization(newOrganization);
    const data = await response.json();
    setOrganizations([...organizations, data]);
    console.log(response);
  };

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold">Your Organizations</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={() => {
            setIsDialogOpen(!isDialogOpen);
          }}
        >
          <DialogTrigger asChild>
            <Button className="" onClick={() => setIsDialogOpen(true)}>
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Enter name"
                value={newOrg.name}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
              />
              <Textarea
                placeholder="Enter description"
                value={newOrg.description}
                onChange={(e) =>
                  setNewOrg({ ...newOrg, description: e.target.value })
                }
              />
              <Button
                className="w-full"
                onClick={() => {
                  handleCreateOrganization();
                  setIsDialogOpen(false);
                }}
                disabled={!newOrg.name.trim()}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap px-16 items-center justify-center gap-6 w-full">
        {organizations?.map((org: any) => (
          <div
            key={org.id}
            className="flex flex-col items-center justify-center gap-2 border h-[200px] w-[30%] py-4 px-8 rounded shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{org.name}</h2>
            <p className="text-sm text-center ">{org.description}</p>
            <p className="text-sm text-gray-500">
              Created at: {new Date(org.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
