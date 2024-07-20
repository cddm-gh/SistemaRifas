export default function Loader() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="animate-spin space-y-2">
                <div className="h-8 w-8 rounded-full bg-blue-500" />
                <div className="h-8 w-8 rounded-full bg-gray-400" />
                <div className="h-8 w-8 rounded-full bg-orange-500" />
            </div>
        </div>
    );
}
