import React, { useState, useEffect } from 'react';

const FALLBACK_QUOTES = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" }
];

const QuoteCard = () => {
    const [quote, setQuote] = useState({ content: 'Loading motivation...', author: '' });

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch('https://api.quotable.io/random');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setQuote(data);
                // Cache the new quote for offline use
                localStorage.setItem('cachedQuote', JSON.stringify(data));
            } catch (error) {
                console.log('Using cached or fallback quote due to error:', error);

                // Try getting from local storage first
                const cached = localStorage.getItem('cachedQuote');
                if (cached) {
                    setQuote(JSON.parse(cached));
                } else {
                    // Random fallback
                    const random = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
                    setQuote(random);
                }
            }
        };

        fetchQuote();
    }, []);

    return (
        <div className="glass-panel" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                "{quote.content}"
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                — {quote.author || 'Unknown'}
            </p>
        </div>
    );
};

export default QuoteCard;
