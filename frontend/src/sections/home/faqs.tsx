import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'What materials are ScrubsCraft scrubs made from?',
    answer: 'Our scrubs are made from a high-quality blend of polyester and spandex, providing durability, comfort, and stretch for easy movement.'
  },
  {
    question: 'Do you offer custom embroidery?',
    answer: 'Yes, we offer custom embroidery services for names, titles, and logos. Please contact our customer service for more information.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unworn items in their original packaging. Please see our Returns page for more details.'
  },
  {
    question: 'How do I care for my ScrubsCraft scrubs?',
    answer: 'Our scrubs are machine washable. We recommend washing in cold water and tumble drying on low heat to maintain their quality and color.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. Please check our Shipping page for more information.'
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left font-semibold py-4 px-6 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {faq.question}
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="py-4 px-6 text-gray-700">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

