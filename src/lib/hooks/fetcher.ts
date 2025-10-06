
export default async function fetcher(api) {
    const result = await fetch(api);
    const data = await result.json();
    return data;
}