export default async (req, context) => {
return new Response(
JSON.stringify({
message: "Hello Riyad! Your backend is working!"
}),
{
headers: {
"Content-Type": "application/json"
}
}
);
};
