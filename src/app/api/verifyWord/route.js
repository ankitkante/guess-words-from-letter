export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');
console.log("vla")
    if (!word) {
        return new Response(JSON.stringify({ valid: false }), { status: 400 });
    }

    try {
        console.log("calling")

        const response = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}`);
        const data = await response.json()
        console.log("response", response)

        const indexFound = data.findIndex(item=> item.word === word.toLowerCase())

        return new Response(JSON.stringify({valid: indexFound !== -1}), {status: 200})
        
    } catch (error) {
        return new Response(JSON.stringify({ valid: false, error: error.message }), { status: 500 });
    }
}