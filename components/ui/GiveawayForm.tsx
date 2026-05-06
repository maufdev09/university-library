import { BookOpenCheck, Send } from "lucide-react";

import { createGiveaway } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";
import { bookCategories } from "@/lib/categories";

export default function GiveawayForm() {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpenCheck className="size-5 text-primary" />
          <CardTitle>List an unwanted book</CardTitle>
        </div>
        <CardDescription>
          Add the details readers need before they contact you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createGiveaway}>
          <FieldGroup>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="title">Book Title</FieldLabel>
                <Input id="title" name="title" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="author">Author</FieldLabel>
                <Input id="author" name="author" required />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <select
                  id="category"
                  name="category"
                  required
                  defaultValue="Academic"
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {bookCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                <FieldLabel htmlFor="condition">Condition</FieldLabel>
                <Input
                  id="condition"
                  name="condition"
                  placeholder="Good, highlighted, old edition..."
                  required
                />
              </Field>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="classLevel">Class / Level</FieldLabel>
                <Input
                  id="classLevel"
                  name="classLevel"
                  placeholder="Class 9, HSC, BBA 1st year..."
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="subject">Subject</FieldLabel>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Math, Physics, Accounting..."
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                name="description"
                className="min-h-28 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Course, edition, notes, pickup area, or anything useful."
                required
              />
            </Field>
            <CloudinaryUpload />
            <Field>
              <FieldLabel htmlFor="contactNote">Contact Note</FieldLabel>
              <Input
                id="contactNote"
                name="contactNote"
                placeholder="Best time to message, campus gate, etc."
              />
            </Field>
            <Button type="submit" className="w-full sm:w-fit">
              <Send />
              Publish giveaway
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
