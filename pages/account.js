export default function Account() {
    return (
        <button
            onClick={async () => {
                const res = await fetch('api/create-account');
                const url = (await res.json()).url;
                window.location.href = url;
            }}
        >
            click
        </button>
    );
};