// use the sportsdb v1 api to fetch league info for the specified league either nfl, nba, mlb, nhl

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const league = searchParams.get('league');
    console.log('Requested league:', league);
    if (!league) {
        return NextResponse.json({ error: 'League parameter is required' }, { status: 400 });
    }
    const league_ids: { [key: string]: string } = {
        nfl: '4391',
        nba: '4387',
        mlb: '4424',
        nhl: '4380',
    };
    if (!league_ids[league.toLowerCase()]) {
        return NextResponse.json({ error: 'Invalid league parameter' }, { status: 400 });
    }

    const apiUrl = `https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=${league_ids[league.toLowerCase()]}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch league data' }, { status: 500 });
        }
        const data = await response.json();
        const league = data.leagues ? data.leagues[0] : null;
        if (!league) {
            return NextResponse.json({ error: 'League not found' }, { status: 404 });
        }
        return NextResponse.json(league);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching league data' }, { status: 500 });
    }
}