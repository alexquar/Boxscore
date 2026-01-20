//fetch the team data for a specified team from the sportsdb v1 api using the team name as a query parameter

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const teamName = searchParams.get('team');
    console.log('Requested team name:', teamName);
    if (!teamName) {
        return NextResponse.json({ error: 'team parameter is required' }, { status: 400 });
    }

    const apiUrl = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(teamName)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 });
        }
        const data = await response.json();
        const team = data.teams ? data.teams[0] : null;
        if (!team) {
            return NextResponse.json({ error: '     Team not found' }, { status: 404 });
        }
        return NextResponse.json(team);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching team data' }, { status: 500 });
    }
}