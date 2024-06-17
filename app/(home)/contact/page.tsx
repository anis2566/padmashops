import { Clock3, Mail, MapPin, Phone } from "lucide-react"

import { ContactForm } from "@/components/home/contact/contact-form"

const Contact = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 my-4">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-10">
                    <div className="space-y-1">
                        <h1 className="text-3xl tracking-widest font-semibold text-center">Get in Touch with Us</h1>
                        <p className="text-muted-foreground max-w-[300px] leading-6 text-center mx-auto">We're here to help! Reach out with any questions, feedback, or inquiries.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-x-3">
                            <Clock3 className="text-primary w-6 h-6" />
                            <div className="space-y-1">
                                <h4 className="text-xl font-semibold">Office Hours</h4>
                                <p className="text-sm text-muted-foreground">10am - 9pm.</p>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <MapPin className="text-primary w-6 h-6" />
                            <div className="space-y-1">
                                <h4 className="text-xl font-semibold">Office</h4>
                                <p className="text-sm text-muted-foreground">Chak bazar, Dhaka-1200.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-x-3">
                            <Mail className="text-primary w-6 h-6" />
                            <div className="space-y-1">
                                <h4 className="text-xl font-semibold">Email</h4>
                                <p className="text-sm text-muted-foreground">support@eshops.com</p>
                            </div>
                        </div>
                        <div className="flex gap-x-3">
                            <Phone className="text-primary w-6 h-6" />
                            <div className="space-y-1">
                                <h4 className="text-xl font-semibold">Phone</h4>
                                <p className="text-sm text-muted-foreground">01319-131697.</p>
                                <p className="text-sm text-muted-foreground">01319-131697.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </div>
    )
}

export default Contact