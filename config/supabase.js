const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
        "⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing."
    );
}

async function supabaseRequest(
    table,
    options = {}
) {
    const {
        method = "GET",
        query = "",
        body
    } = options;

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/${table}${query}`,
        {
            method,

            headers: {
                "apikey":
                    SUPABASE_SERVICE_ROLE_KEY,

                "Authorization":
                    `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,

                "Content-Type":
                    "application/json",

                "Prefer":
                    "return=representation"
            },

            body:
                body !== undefined
                    ? JSON.stringify(body)
                    : undefined
        }
    );

    const text =
        await response.text();

    let data;

    try {
        data = text
            ? JSON.parse(text)
            : null;
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(
            `Supabase error ${response.status}: ${
                typeof data === "string"
                    ? data
                    : JSON.stringify(data)
            }`
        );
    }

    return data;
}

module.exports = {
    supabaseRequest
};