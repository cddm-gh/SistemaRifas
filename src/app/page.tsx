import { getDraws } from '@/app/actions/draws';
import DrawsList from '@/components/draws/DrawsList';
import LandingLayout from '@/components/LandingLayout';

export default async function Index() {
    const draws = await getDraws();

    return (
        <LandingLayout>
            <section className="bg-blue-500 text-white text-center py-20">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold">
                        Engaging Headline About the Lottery
                    </h1>
                    <p className="mt-4">
                        Brief Description or Tagline about Opportunities
                    </p>
                    <button className="mt-8 px-4 py-2 bg-white text-blue-500 rounded-full font-semibold">
                        Get Started
                    </button>
                </div>
            </section>

            {draws?.length ? (
                <section className="py-16 px-4">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">
                                Sorteos Activos
                            </h2>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline"
                            >
                                Ver Todos
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            <DrawsList draws={draws} />
                        </div>
                        <div className="mt-8 text-center">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold">
                                Load More
                            </button>
                        </div>
                    </div>
                </section>
            ) : null}

            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">
                            Featured Winner Story
                        </h2>
                        <p className="mt-4">
                            Highlight of a Big Prize or Winner Story...
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="bg-blue-500 text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                                1
                            </div>
                            <p className="mt-4">Step 1 Description</p>
                        </div>
                        <div>
                            <div className="bg-blue-500 text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                                2
                            </div>
                            <p className="mt-4">Step 2 Description</p>
                        </div>
                        <div>
                            <div className="bg-blue-500 text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                                3
                            </div>
                            <p className="mt-4">Step 3 Description</p>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
