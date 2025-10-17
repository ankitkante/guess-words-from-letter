export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');

    if (!word) {
        return new Response(JSON.stringify({ valid: false }), { status: 400 });
    }

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify({ valid: true, data }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ valid: false }), { status: response.status });
        }
    } catch (error) {
        return new Response(JSON.stringify({ valid: false, error: error.message }), { status: 500 });
    }
}