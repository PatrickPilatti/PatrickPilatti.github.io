import React, {
    Component
} from 'react';
import './App.css';
import meme from './memes.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import MemeCard from './components/MemeCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        meme: meme,
        unselectedMemes: meme
    }

    componentDidMount() {}

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectMemes = maymay => {
        const findMeme = this.state.unselectedMemes.find(item => item.maymay === maymay);

        if (findMeme === undefined) {

            this.setState({
                message: "Wrong!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                meme: meme,
                unselectedMemes: meme
            });
        } else {

            const newMemes = this.state.unselectedMemes.filter(item => item.maymay !== maymay);

            this.setState({
                message: "Das Rite!",
                curScore: this.state.curScore + 1,
                meme: meme,
                unselectedMemes: newMemes
            });
        }

        this.shuffleArray(meme);
    };

    render() {
        return ( <
            Wrapper >
            <
            Navpills message = {
                this.state.message
            }
            curScore = {
                this.state.curScore
            }
            topScore = {
                this.state.topScore
            }
            /> <
            Title / > {
                this.state.meme.map(meme => ( <
                    MemeCard maymay = {
                        meme.maymay
                    }
                    image = {
                        meme.image
                    }
                    selectMeme = {
                        this.selectMemes
                    }
                    curScore = {
                        this.state.curScore
                    }
                    />
                ))
            } <
            /Wrapper>
        );
    }
}

export default App;