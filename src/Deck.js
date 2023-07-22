import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(null);

    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${API_BASE_URL}/new/shuffle`);
            setDeck(d.data);
        }
        fetchData();
    }, []);

    async function draw() {
        try {
            const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw`);

            if (drawRes.data.remaining === 0 ) {
                throw new Error('no cards left');
            }
            const card = drawRes.data.cards[0];
            setDrawn(d => [
                ...d,
                {id: card.code,
                name: `${card.suit} ${card.value}`,
                image: card.image
                },
            ]);
        }
        catch (err) {
            alert(err)
        }
    }
    async function shuffle() {
        setIsShuffling(true);
        try {
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle`);
            setDrawn([]);
        }
        catch (err) {
            alert(err);
        }
        finally {
            setIsShuffling(false);
        }
    }
    function drawBtn() {
        if (!deck) {
            return null;
        }
        return (
            <button className="draw"
                    onClick={draw}
                    disabled={isShuffling}>
                        draw card
            </button>
        );
    }
    function shuffleBtn() {
        if (!deck) {
            return null;
        }
        return (
            <button className="shuffle"
                    onClick={shuffle}
                    disabled={isShuffling}>
                        shuffle deck
            </button>
        );
    }
    return (
        <div className="Deck">
            {drawBtn()}{shuffleBtn()}
            <div className="table">
                {drawn.map(c => (
                    <Card key={c.id}
                          name={c.name}
                          image={c.image}
                    />
                ))};
            </div>
        </div>
    );
};

export default Deck;