"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Luggage, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Destination } from "@/components/DestinationsExplorer";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City Tour",
  "Wildlife",
  "Mountain",
];

const fieldClass =
  "h-10 border-transparent bg-muted/50! px-3.5 text-base md:text-sm";

const UpdateDestinationDetails = ({
  destination,
}: {
  destination: Destination;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(destination);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setForm(destination);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = await getTokenFromClient();

    try {
      // Exclude _id from update payload because MongoDB _id is immutable
      const formData = { ...form } as Partial<Destination>;
      delete formData._id;

      const res = await fetch(
        `http://localhost:4000/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
             "Content-Type": "application/json",
              authorization: `Bearer ${token}`
                  
           },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update destination:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Pencil className="size-3.5" />
            Edit
          </Button>
        }
      />
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-destination-name">Destination Name</Label>
            <Input
              id="edit-destination-name"
              name="destinationName"
              placeholder="Bali Paradise"
              className={fieldClass}
              value={form.destinationName ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                name="country"
                placeholder="Indonesia"
                className={fieldClass}
                value={form.country ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label id="edit-category-label">Category</Label>
              <Select
                value={form.category ?? ""}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: String(value) }))
                }
              >
                <SelectTrigger
                  className={`${fieldClass} h-10! w-full justify-start`}
                  aria-labelledby="edit-category-label"
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-price">Price (USD)</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                placeholder="e.g., 1299"
                className={fieldClass}
                value={form.price ?? ""}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                name="duration"
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldClass}
                value={form.duration ?? ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-departure-date">Departure Date</Label>
            <Input
              id="edit-departure-date"
              name="departureDate"
              type="date"
              className={`${fieldClass} [scheme-light]`}
              value={form.departureDate ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-image-url">Image URL</Label>
            <Input
              id="edit-image-url"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClass}
              value={form.imageUrl ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              placeholder="Describe the travel experience..."
              className="min-h-28 border-transparent bg-muted/50! px-3.5 py-2.5 text-base md:text-sm"
              value={form.description ?? ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 border-destructive/30! px-4 text-destructive hover:border-destructive/40 hover:bg-destructive/10! hover:text-destructive"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              <Trash2 />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 gap-2 bg-brand! px-4 text-white hover:bg-brand/90!"
              disabled={isSubmitting}
            >
              <Luggage />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDestinationDetails;
