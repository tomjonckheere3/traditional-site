import { createCustomerMessage } from '../lib/graphcms' 

export default function ContactForm() {

    const handleSubmit = async event => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const subject = event.target.subject.value
        const message = event.target.message.value

        const res = (await createCustomerMessage(name, email, subject, message))
    }

    return(
        <form  onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="name">Name</label>
                <input className="border py-2 px-3 text-grey-darkest" id="name" name="name" type="text" required />
            </div>
            <div  className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="email">Email</label>
                <input className="border py-2 px-3 text-grey-darkest" id="email" name="email" type="email" required />
            </div>
            <div  className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="subject">Subject</label>
                <input className="border py-2 px-3 text-grey-darkest" id="subject" name="subject" type="text" required />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="message">Message</label>
                <textarea className="border py-2 px-3 text-grey-darkest" id="message" name="message" rows="8" />
            </div>
            <button className="block bg-green-500 hover:bg-green-600 text-white text-lg mx-auto p-4 rounded" type="submit">Send message</button>
        </form>
    )
}