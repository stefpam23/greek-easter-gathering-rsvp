'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link'; // Import Link
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"


const dietaryOptions = [
    { value: "none", label: "No preferences" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "seafood", label: "Seafood" },
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
          <p className="text-lg md:text-m text-center">
          Χριστὸς ἀνέστη! Join us for Greek Orthodox Easter celebration featuring traditional lamb roast and festive Greek cuisine to celebrate faith, food, and family at Sonia and Niko's house. We'll be serving traditional Easter dishes including oven-roasted lamb, red-dyed eggs, tsoureki bread, tzaziki and other dips, greek coffee, and a variety of Greek appetizers and desserts.
          </p>
          <div className="flex flex-col md:flex-row justify-around mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Date &amp; Time</h2>
              <p>April 20, 2025</p>
              <p>1:00 PM</p>
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
              <li>And More...</li>
            </ul>
          </div>
        </section>

        {/* Link to RSVP List */}
        <div className="text-center mb-4">
           <Button asChild variant="outline">
             <Link href="/rsvps">View Submitted RSVPs</Link>
           </Button>
        </div>

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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [attendees, setAttendees] = useState('1');
    const [dietary, setDietary] = useState('none');
    const [requests, setRequests] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast(); // Assuming you have a Toaster component set up in layout

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Updated validation: only name, email, and attendees are mandatory
        if (!name || !email || !attendees) {
            toast({
                title: "Error",
                description: "Please fill out all required fields (Name, Email, Attendees).",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }

        const rsvpData = {
            name,
            email,
            phone, // Phone is included but not required for validation
            attendees: parseInt(attendees, 10),
            dietary,
            requests,
            submittedAt: new Date().toISOString(),
        };

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rsvpData),
            });

            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Success!",
                    description: "Your RSVP has been submitted. Check your email for a calendar invite!", // Updated toast message
                });
                // Reset form
                setName('');
                setEmail('');
                setPhone('');
                setAttendees('1');
                setDietary('none');
                setRequests('');
            } else {
                throw new Error(result.message || 'Failed to submit RSVP');
            }
        } catch (error: any) {
            console.error("RSVP Submission Error:", error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>RSVP to Greek Easter Celebration</CardTitle>
                    <CardDescription>Please fill out the form below to confirm your attendance.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Contact Number</Label> {/* Removed asterisk */}
                        <Input
                            type="tel"
                            id="phone"
                            placeholder="Enter your contact number (Optional)" // Updated placeholder
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            // Removed required attribute
                         />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="attendees">Number of Attendees *</Label>
                        <Input
                            type="number"
                            id="attendees"
                            placeholder="Enter number of attendees"
                            value={attendees}
                            onChange={(e) => setAttendees(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="dietary">Dietary Preferences</Label>
                        <Select value={dietary} onValueChange={setDietary}>
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
                        <Textarea
                            id="requests"
                            placeholder="Enter any special requests"
                            value={requests}
                            onChange={(e) => setRequests(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit RSVP & Get Calendar Invite'} {/* Updated Button Text */}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
