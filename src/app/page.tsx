'use client';

import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Icons } from '@/components/icons';

const dietaryOptions = [
    { value: "none", label: "No preferences" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "dairy-free", label: "Dairy-Free" },
    { value: "nut-free", label: "Nut-Free" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Static Background Image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `url('https://picsum.photos/id/10/1920/1080')`, // Replace with desired image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px) brightness(0.5)',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto p-4 md:p-8 lg:p-12">
        {/* Event Details */}
        <section className="mb-8 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            Greek Easter Celebration
          </h1>
          <p className="text-lg md:text-xl text-center">
            Join us for a traditional Greek Easter celebration filled with joy,
            family, and cultural richness.
          </p>
          <div className="flex flex-col md:flex-row justify-around mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Date &amp; Time</h2>
              <p>April 20, 2025</p>
              <p>12:00 PM</p>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <h2 className="text-2xl font-semibold mb-2">Location</h2>
              <p>606 Wapato PL SE, Renton, WA</p>
              {/* Interactive Map Placeholder */}
              <a
                href="https://maps.app.goo.gl/rUwzSoex8pKmLfWq5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                View Map
              </a>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Traditional Menu Highlights
            </h2>
            <ul className="list-disc list-inside">
              <li>Tsoureki (Sweet Bread)</li>
              <li>Red Egg Cracking</li>
              <li>Roast Lamb</li>
            </ul>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h2 className="text-3xl font-semibold mb-4 text-primary text-center">
            RSVP
          </h2>
          <RSVPForm />
        </section>
      </div>
    </div>
  );
}

function RSVPForm() {
    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>RSVP to Greek Easter Celebration</CardTitle>
                    <CardDescription>Please fill out the form below to confirm your attendance.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Contact Number</Label>
                        <Input type="tel" id="phone" placeholder="Enter your contact number" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="attendees">Number of Attendees</Label>
                        <Input
                            type="number"
                            id="attendees"
                            placeholder="Enter number of attendees"
                            defaultValue={1}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dietary">Dietary Preferences</Label>
                        <Select>
                            <SelectTrigger id="dietary">
                                <SelectValue placeholder="Select dietary preferences" />
                            </SelectTrigger>
                            <SelectContent>
                                {dietaryOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea id="requests" placeholder="Enter any special requests" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button>Submit RSVP</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
