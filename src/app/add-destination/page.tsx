"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Luggage, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "City Tour",
  "Wildlife",
  "Mountain",
];

const initialForm = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

// `!` (important) overrides beat the shadcn base/variant utilities, which
// Tailwind v4 emits in a fixed order regardless of className order.
const fieldClass =
  "h-10 border-transparent bg-muted/50! px-3.5 text-base md:text-sm";

const AddDestinationPage = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!form.destinationName.trim()) {
      setError("Please enter a destination name.");
      return;
    }
    if (!form.country.trim()) {
      setError("Please enter a country.");
      return;
    }
    if (!form.category) {
      setError("Please select a category.");
      return;
    }
    if (!form.price.trim() || Number(form.price) <= 0) {
      setError("Please enter a valid price in USD.");
      return;
    }
    if (!form.duration.trim()) {
      setError("Please enter a duration (e.g., 7 Days/6 Nights).");
      return;
    }
    if (!form.imageUrl.trim()) {
      setError("Please enter an image URL.");
      return;
    }

    const token = await getTokenFromClient();

    try {
      setIsSubmitting(true);
      const res = await fetch("http://localhost:4000/add-destination", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to add destination.");
      }

      const userData = await res.json();
      console.log(userData);
      setForm(initialForm);
      router.push("/destinations");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to save destination. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-8 text-3xl font-semibold md:text-4xl">
          Add New Travel Package
        </h1>

        <Card className="p-6 shadow-sm [--card-spacing:1.5rem]">
          <CardContent className="px-0">
            {error && (
              <div className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="destination-name">
                  Destination Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="destination-name"
                  name="destinationName"
                  placeholder="Bali Paradise"
                  className={fieldClass}
                  value={form.destinationName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    className={fieldClass}
                    value={form.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label id="category-label">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) => {
                      setForm((prev) => ({ ...prev, category: String(value) }));
                      if (error) setError(null);
                    }}
                  >
                    <SelectTrigger
                      className={`${fieldClass} h-10! w-full justify-start`}
                      aria-labelledby="category-label"
                    >
                      <SelectValue placeholder="Select Category" />
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
                  <Label htmlFor="price">
                    Price (USD) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    placeholder="e.g., 1299"
                    className={fieldClass}
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="duration">
                    Duration <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    className={fieldClass}
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="departure-date">Departure Date</Label>
                <Input
                  id="departure-date"
                  name="departureDate"
                  type="date"
                  className={`${fieldClass} [scheme-light]`}
                  value={form.departureDate}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="image-url">
                  Image URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="image-url"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={fieldClass}
                  value={form.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the travel experience..."
                  className="min-h-28 border-transparent bg-muted/50! px-3.5 py-2.5 text-base md:text-sm"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 gap-2 border-destructive/30! px-4 text-destructive hover:border-destructive/40 hover:bg-destructive/10! hover:text-destructive"
                  onClick={() => {
                    setForm(initialForm);
                    setError(null);
                  }}
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
                  {isSubmitting ? "Adding..." : "Add Travel Package"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddDestinationPage;
