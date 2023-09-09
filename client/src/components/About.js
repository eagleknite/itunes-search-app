function About() {
    return (
        <div className="p-6 space-y-8">
            <section>
                <h1 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">About the App</h1>
                <p className="text-lg leading-relaxed">
                    This application is designed to search for media across various types and sources. 
                    It leverages the iTunes API to fetch search results, allowing users to explore a vast 
                    collection of content from music to movies, podcasts, and more. The app also includes 
                    features like filtering, sorting, and a favorites list, ensuring a seamless user experience.
                </p>
            </section>

            <section>
                <h1 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">About the Developer</h1>
                <div className="space-y-4">
                    <p className="text-xl font-bold">ARNOLD TWALA</p>
                    <p className="text-lg">Assistant Librarian (Acquisition Department)</p>
                    <p>Email: <a href="mailto:arnoldtwl@gmail.com" className="text-blue-500 underline hover:text-blue-600">arnoldtwl@gmail.com</a></p>
                    <p>Phone: 0727035123</p>
                    <p>Location: Dzumeri (Ndhambi), Greater Giyani Municipality, Limpopo, ZA</p>
                </div>
                <div className="mt-4 flex space-x-4">
                    <a href="https://www.linkedin.com/in/arnoldtwl/" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                        <span className="underline">LinkedIn</span>
                    </a>
                    <a href="https://github.com/eagleknite" className="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                        <span className="underline">GitHub</span>
                    </a>
                </div>
            </section>
        </div>
    );
}

export default About;

