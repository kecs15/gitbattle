import React, { Component, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from './components/Loading'

const Popular = lazy(() => import('./components/Popular'))
const Battle = lazy(() => import('./components/Battle'))
const Result = lazy(() => import('./components/Result'))

class App extends Component {
    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    }
    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <Suspense fallback={<Loading />}>
                                <Switch>
                                    <Route path='/' exact component={Popular} />
                                    <Route path='/battle' exact component={Battle} />
                                    <Route path='/battle/results' component={Result} />
                                    <Route render={() => <h1>404</h1>} />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)