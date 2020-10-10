import React, { Component } from 'react';

import '../assets/stylesheets/hangman.css';
import img0 from '../assets/images/0.jpg';
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import { randomWord } from '../assets/data/words';
import Modal from '../components/ui/Modal';

class Hangman extends Component {
    /** by default, allow 6 guesses and use provided gallows images. */
    static defaultProps = {
        images: [img0, img1, img2, img3, img4, img5, img6],
    };

    state = {
        nWrong: 0,
        guessed: new Set(),
        answer: 'apple',
        maxWrong: 6,
        playing: true,
        modalShow: false,
    };

    componentDidMount() {
        const answer = randomWord();
        this.setState(prevState => ({ ...prevState, answer }));
    }

    componentDidUpdate() {
        const letters = this.state.answer.split('');
        const guessed = letters.every(char => {
            return [...this.state.guessed].includes(char);
        });
        if (
            (guessed && this.state.playing) ||
            (this.state.nWrong === this.state.maxWrong && this.state.playing)
        ) {
            this.setState(prevState => ({
                ...prevState,
                playing: false,
                modalShow: true,
            }));
        }
    }

    restartGame = () => {
        const answer = randomWord();
        this.setState(prevState => {
            return {
                ...prevState,
                nWrong: 0,
                answer,
                guessed: new Set(),
                playing: true,
                modalShow: false,
            };
        });
    };

    generateButtons = () => {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
            <button
                value={ltr}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(ltr)}>
                {ltr}
            </button>
        ));
    };

    guessedWord = () => {
        return this.state.answer
            .split('')
            .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
    };

    handleGuess = e => {
        let ltr = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            guessed: prevState.guessed.add(ltr),
            nWrong: prevState.nWrong + (prevState.answer.includes(ltr) ? 0 : 1),
        }));
    };

    handleModalClose = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                modalShow: false,
            };
        });
    };

    render() {
        const win = this.state.nWrong < 6 && !this.state.playing;
        return (
            <>
                <Modal show={this.state.modalShow} clicked={this.restartGame}>
                    <div className='results'>
                        <h1>You {win ? 'Won!' : 'Lost'}</h1>
                        {win ? null : (
                            <p>The correct answer is "{this.state.answer}".</p>
                        )}
                        <button onClick={this.restartGame}>Play Again</button>
                    </div>
                </Modal>
                <div className='Hangman'>
                    <h1>Hangman</h1>
                    <img
                        src={this.props.images[this.state.nWrong]}
                        alt='Hangman Part'
                    />
                    <p className='Hangman-word'>{this.guessedWord()}</p>
                    {this.state.nWrong < 6 && this.state.playing ? (
                        <p className='Hangman-btns'>{this.generateButtons()}</p>
                    ) : null}
                    <div className='counter'>
                        Wrong guesses: {this.state.nWrong}
                    </div>
                    <div className='answer'>
                        Word Length: {this.state.answer.split('').length}
                    </div>
                </div>
            </>
        );
    }
}

export default Hangman;
