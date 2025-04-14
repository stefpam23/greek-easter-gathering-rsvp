'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Rsvp {
    name: string;
    email: string;
    phone: string;
    attendees: number;
    dietary: string;
    requests?: string;
    submittedAt: string;
}

export default function RsvpListPage() {
    const [rsvps, setRsvps] = useState<Rsvp[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRsvps = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/rsvp');
                if (!response.ok) {
                    throw new Error('Failed to fetch RSVPs');
                }
                const data: Rsvp[] = await response.json();
                // Sort by submission date, newest first
                data.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
                setRsvps(data);
            } catch (err: any) {
                console.error("Error fetching RSVPs:", err);
                setError(err.message || "An unknown error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRsvps();
    }, []);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Submitted RSVPs</h1>
                <Button asChild>
                  <Link href="/">Back to Event</Link>
                </Button>
            </div>

            {isLoading && (
                <div className="grid gap-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {!isLoading && !error && rsvps.length === 0 && (
                <p>No RSVPs submitted yet.</p>
            )}

            {!isLoading && !error && rsvps.length > 0 && (
                <div className="grid gap-4">
                    {rsvps.map((rsvp, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <CardTitle>{rsvp.name}</CardTitle>
                                <CardDescription>
                                    {rsvp.email} - Submitted on {new Date(rsvp.submittedAt).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Phone:</strong> {rsvp.phone}</p>
                                <p><strong>Attendees:</strong> {rsvp.attendees}</p>
                                <p><strong>Dietary Preferences:</strong> {rsvp.dietary}</p>
                                {rsvp.requests && <p><strong>Requests:</strong> {rsvp.requests}</p>}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
