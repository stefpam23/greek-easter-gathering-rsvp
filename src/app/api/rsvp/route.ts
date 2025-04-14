import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import path from 'path';

const rsvpFilePath = path.resolve(process.cwd(), 'rsvps.json');

// Helper function to read RSVPs, ensuring the file exists
async function readRsvps() {
    try {
        await fs.access(rsvpFilePath); // Check if file exists
    } catch (error) {
        // If file doesn't exist, create it with an empty array
        await fs.writeFile(rsvpFilePath, JSON.stringify([], null, 2), 'utf-8');
        return [];
    }
    // If file exists, read it
    const data = await fs.readFile(rsvpFilePath, 'utf-8');
    return JSON.parse(data);
}

// GET handler to fetch all RSVPs
export async function GET() {
    try {
        const rsvps = await readRsvps();
        return NextResponse.json(rsvps);
    } catch (error) {
        console.error("Failed to read RSVPs:", error);
        return NextResponse.json({ message: 'Failed to read RSVPs' }, { status: 500 });
    }
}

// POST handler to add a new RSVP
export async function POST(request: Request) {
    try {
        const newRsvp = await request.json();
        // Basic validation
        if (!newRsvp.name || !newRsvp.email) {
             return NextResponse.json({ message: 'Missing required fields (name, email)' }, { status: 400 });
        }

        const rsvps = await readRsvps();
        rsvps.push(newRsvp);
        await fs.writeFile(rsvpFilePath, JSON.stringify(rsvps, null, 2), 'utf-8');
        return NextResponse.json({ message: 'RSVP submitted successfully!', rsvp: newRsvp }, { status: 201 });
    } catch (error) {
        console.error("Failed to save RSVP:", error);
        return NextResponse.json({ message: 'Failed to save RSVP' }, { status: 500 });
    }
}

// Ensure the rsvps.json file exists on startup
readRsvps().catch(error => console.error("Initial check/creation of rsvps.json failed:", error));
