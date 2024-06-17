import Image from "next/image";

const About = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 my-4 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                        Discover the Best Products for Your Lifestyle
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                        At E-shop Ecommerce, we're dedicated to providing our customers with a seamless and enjoyable shopping
                        experience. Our mission is to curate a wide selection of high-quality products that cater to your
                        unique needs and preferences.
                    </p>
                </div>
                <div className="aspect-video relative">
                    <Image
                        src="/about-placeholder.jpg"
                        alt="Placeholder"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <section className="w-full py-6">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                        Key Features
                        </div>
                        <h2 className="text-4xl font-bold tracking-tighter">Experience the Difference</h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-muted-foreground">
                        At E-shop Ecommerce, we're committed to providing you with a seamless and secure shopping experience.
                        Explore our key features and discover why we're the best choice for all your ecommerce needs.
                        </p>
                    </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-center space-y-4">
                        <ul className="grid gap-6">
                        <li>
                            <div className="grid gap-1">
                            <h3 className="text-xl font-bold">Secure Payments</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Rest assured that your financial information is safe with our advanced encryption and fraud
                                protection measures.
                            </p>
                            </div>
                        </li>
                        <li>
                            <div className="grid gap-1">
                            <h3 className="text-xl font-bold">Fast Shipping</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                We partner with leading logistics providers to ensure your orders are delivered quickly and
                                efficiently, right to your doorstep.
                            </p>
                            </div>
                        </li>
                        <li>
                            <div className="grid gap-1">
                            <h3 className="text-xl font-bold">Wide Selection</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Explore our vast collection of high-quality products across a wide range of categories to find
                                exactly what you're looking for.
                            </p>
                            </div>
                        </li>
                        </ul>
                    </div>
                    <div className="aspect-video relative">
                        <Image
                            src="/about-placeholder-2.jpg"
                            alt="Placeholder"
                            fill
                            className="object-cover"
                        />
                    </div>
                    </div>
                </div>
            </section>
            <section className="w-full">
                <div className="container">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Our Team</div>
                        <h2 className="text-3xl font-bold tracking-tighter">Meet the E-shop Ecommerce Team</h2>
                        <p className="max-w-[900px] text-normal text-muted-foreground">
                        Our dedicated team of ecommerce experts is committed to providing you with the best shopping
                        experience possible. Get to know the people behind Acme Ecommerce.
                        </p>
                    </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src="/anis.jpg" width="150" height="150" alt="Team Member" className="h-[150px] w-[150px] rounded-full" />
                        <div className="space-y-1 text-center">
                        <h3 className="text-xl font-bold">John Doe</h3>
                        <p className="text-gray-500 dark:text-gray-400">Co-Founder and CEO</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            John has over 15 years of experience in the ecommerce industry and is passionate about building
                            innovative solutions that empower businesses and customers.
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src="/anis.jpg" width="150" height="150" alt="Team Member" className="h-[150px] w-[150px] rounded-full" />
                        <div className="space-y-1 text-center">
                        <h3 className="text-xl font-bold">Jane Smith</h3>
                        <p className="text-gray-500 dark:text-gray-400">Co-Founder and COO</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Jane has a background in supply chain management and is dedicated to ensuring a seamless and
                            efficient shopping experience for our customers.
                        </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src="/anis.jpg" width="150" height="150" alt="Team Member" className="h-[150px] w-[150px] rounded-full" />
                        <div className="space-y-1 text-center">
                        <h3 className="text-xl font-bold">Bob Johnson</h3>
                        <p className="text-gray-500 dark:text-gray-400">Head of Product Development</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Bob is a seasoned product manager with a keen eye for design and user experience. He leads our team
                            in developing innovative ecommerce solutions.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;