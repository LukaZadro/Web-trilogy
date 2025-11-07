import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

type JobFormValues = {
  companyName: string | "";
  title: string;
  description: string;
  location?: string;
  jobType: "posao" | "studentski-posao" | "internship";
  applicationDeadline?: string;
  contactEmail?: string;
};

const defaultValues: JobFormValues = {
  companyName: "",
  title: "",
  description: "",
  location: "",
  jobType: "posao",
  applicationDeadline: "",
  contactEmail: "",
};

const CreateJobPosting: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<JobFormValues>({ defaultValues });
  const { handleSubmit, control, reset } = methods;

  const onSubmit = async (data: JobFormValues) => {
    try {
      // ensure companyId is a number
      const payload = {
        ...data
      };

      const res = await fetch(`${"http://localhost:3001"}/api/job-postings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body?.error || body?.message || "Failed to create job posting");
      }

      // success: navigate to listings or reset form
      reset();
      navigate("/poslodavac"); // change location as needed
    } catch (err: any) {
      // simple inline error handling; replace with UI toast if you have one
      alert(err?.message || "Greška pri kreiranju oglasa");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-card/80 rounded-md shadow">
            <Navbar />
      <h1 className="text-2xl font-semibold mb-4 pt-20">Novi oglas za posao</h1>

      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormField
              name="companyName"
              control={control}
              rules={{ required: "Company name is required"}}
              render={({ field }) => (
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    min={1}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Ime kompanije"
                  />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormField
              name="title"
              control={control}
              rules={{ required: "Naslov je obavezan", minLength: { value: 3, message: "Prekratak naslov" } }}
              render={({ field }) => (
                <FormControl>
                  <input {...field} className="w-full border rounded px-3 py-2" placeholder="Naziv pozicije" />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormField
              name="description"
              control={control}
              rules={{ required: "Opis je obavezan", minLength: { value: 10, message: "Prekratak opis" } }}
              render={({ field }) => (
                <FormControl>
                  <textarea {...field} rows={6} className="w-full border rounded px-3 py-2" placeholder="Detaljan opis posla" />
                </FormControl>
              )}
            />
            <FormMessage />
          </FormItem>

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormField
                name="location"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <input {...field} className="w-full border rounded px-3 py-2" placeholder="Lokacija (npr. Zagreb)" />
                  </FormControl>
                )}
              />
            </FormItem>

            <FormItem>
              <FormLabel>Job type</FormLabel>
              <FormField
                name="jobType"
                control={control}
                rules={{ required: "Odaberite tip posla" }}
                render={({ field }) => (
                  <FormControl>
                    <select {...field} className="w-full border rounded px-3 py-2">
                      <option value="posao">posao</option>
                      <option value="studentski-posao">studentski-posao</option>
                      <option value="internship">internship</option>
                    </select>
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Application deadline</FormLabel>
              <FormField
                name="applicationDeadline"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <input {...field} type="date" className="w-full border rounded px-3 py-2" />
                  </FormControl>
                )}
              />
            </FormItem>

            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormField
                name="contactEmail"
                control={control}
                rules={{
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Neispravan email" },
                }}
                render={({ field }) => (
                  <FormControl>
                    <input {...field} type="email" className="w-full border rounded px-3 py-2" placeholder="kontakt@firma.hr" />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded">
              Reset
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
              Objavi oglas
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobPosting;