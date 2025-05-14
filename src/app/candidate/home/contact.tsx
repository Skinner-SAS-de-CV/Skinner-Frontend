"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Have questions about ForLabJP? We re here to help.
                    </p>
                  </div>
                  <div className="w-full max-w-md space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <form className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none">
                              Name
                            </label>
                            <input
                              id="name"
                              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium leading-none">
                              Message
                            </label>
                            <textarea
                              id="message"
                              className="flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm"
                              placeholder="Enter your message"
                            />
                          </div>
                          <Button className="w-full">Send Message</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
  )
}
