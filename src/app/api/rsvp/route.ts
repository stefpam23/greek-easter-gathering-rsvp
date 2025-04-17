import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';

const rsvpCollection = collection(db, 'rsvps');

// GET handler to fetch all RSVPs
export async function GET() {
    try {
        const q = query(rsvpCollection, orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const rsvps = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
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
        if (!newRsvp.name || !newRsvp.email || !newRsvp.attendees) {
            return NextResponse.json({ message: 'Missing required fields (name, email, attendees)' }, { status: 400 });
        }

        const docRef = await addDoc(rsvpCollection, {
            ...newRsvp,
            submittedAt: new Date().toISOString(), // Ensure submittedAt is a string for consistency
        });

        return NextResponse.json({ message: 'RSVP submitted successfully!', id: docRef.id, rsvp: newRsvp }, { status: 201 });
    } catch (error) {
        console.error("Failed to save RSVP:", error);
        return NextResponse.json({ message: 'Failed to save RSVP' }, { status: 500 });
    }
}

    