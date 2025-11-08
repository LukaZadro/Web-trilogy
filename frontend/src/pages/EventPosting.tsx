import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import domains_faculty from "@/data/domains_faculty";

type EventFormValues = {
  title: string;
  description: string;
  domain: string;
  organizer: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
};

const defaultValues: EventFormValues = {
  title: "",
  description: "",
  domain: "",
  organizer: "",
  location: "",
  start_datetime: "",
  end_datetime: "",
};

const EventPosting = () => {
  const navigate = useNavigate();
  const methods = useForm<EventFormValues>({ defaultValues });
  const { handleSubmit, control, reset } = methods;

  const onSubmit = async (data: EventFormValues) => {
    try {
      // ensure companyId is a number
      const payload = {
        ...data,
      };

      const res = await fetch(`${"http://localhost:3001"}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();
      console.log(body);
      if (!res.ok) {
        throw new Error(
          body?.error || body?.message || "Failed to create event"
        );
      }

      reset();
      navigate("/udruga/upravljanje-dogadajima"); // change location as needed
    } catch (err) {
      // simple inline error handling; replace with UI toast if you have one
      alert(err?.message || "Greška pri kreiranju događaja");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-[180px] pb-10">
        <div className="max-w-3xl mx-auto  p-6 bg-card/80 rounded-md shadow">
          <h1 className="text-2xl font-bold mb-4 ">Novi događaj</h1>

          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Naziv događaja</FormLabel>
                <FormField
                  name="title"
                  control={control}
                  rules={{ required: "Naziv događaja je obavezan" }}
                  render={({ field }) => (
                    <FormControl>
                      <input
                        {...field}
                        type="text"
                        min={1}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Naziv događaja"
                      />
                    </FormControl>
                  )}
                />
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Organizator</FormLabel>
                <FormField
                  name="organizer"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <input
                        {...field}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Ime organizatora"
                      />
                    </FormControl>
                  )}
                />
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormField
                  name="description"
                  control={control}
                  rules={{
                    required: "Opis je obavezan",
                    minLength: { value: 10, message: "Prekratak opis" },
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <textarea
                        {...field}
                        rows={6}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Detaljan opis događaja"
                      />
                    </FormControl>
                  )}
                />
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Domena događaja</FormLabel>
                <FormField
                  name="domain"
                  control={control}
                  rules={{ required: "Odaberite domenu događaja" }}
                  render={({ field }) => (
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded px-3 py-2"
                      >
                        {domains_faculty.map((domain, ind) => (
                          <option key={ind} value={`${domain}`}>
                            {domain}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  )}
                />
                <FormMessage />
              </FormItem>

              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Lokacija</FormLabel>
                  <FormField
                    name="location"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <input
                          {...field}
                          className="w-full border rounded px-3 py-2"
                          placeholder="Lokacija (npr. Zagreb)"
                        />
                      </FormControl>
                    )}
                  />
                </FormItem>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormItem>
                  <FormLabel>Od</FormLabel>
                  <FormField
                    name="start_datetime"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <input
                          {...field}
                          type="date"
                          className="w-full border rounded px-3 py-2"
                        />
                      </FormControl>
                    )}
                  />
                </FormItem>

                <FormItem>
                  <FormLabel>Do</FormLabel>
                  <FormField
                    name="end_datetime"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <input
                          {...field}
                          type="date"
                          className="w-full border rounded px-3 py-2"
                        />
                      </FormControl>
                    )}
                  />
                </FormItem>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-4 py-2 border rounded"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Objavi događaj
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPosting;
