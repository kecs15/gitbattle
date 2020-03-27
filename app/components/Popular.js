import React, { Component, Fragment } from 'react'
import LanguagesNav from './LanguagesNav'
import RepostGrid from './ReposGrid';
import { fetchPopularRepos } from '../utils/api'
import { updateObject } from '../utils/updateObject'
import Loading from './Loading'

class Popular extends Component {

    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null
    }
       
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = selectedLanguage => {
        this.setState({
            selectedLanguage,
            error: null
        })

        if(!this.state.repos[selectedLanguage]) {
            let updatedObject;

            fetchPopularRepos(selectedLanguage)
                .then(data => {
                    updatedObject = updateObject(this.state, {repos: {...this.state.repos, [selectedLanguage]: data}});
                     this.setState(updatedObject)
                })
                .catch(error => {
                    updatedObject = updateObject(this.state, {error: error})
                    this.setState(updatedObject)
                })
        }
    }

    isLoading = () => {
        const { selectedLanguage, repos, error} = this.state

        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage , repos, error} =  this.state
        return (
            <Fragment>

                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                

                {this.isLoading() && <Loading text='Fetching repositories'/>}

                {error && <p className='center-text error'>{error}</p>}

                {repos[selectedLanguage] && <RepostGrid repos={repos[selectedLanguage]} />}
            </Fragment>
        )
    }
}

export default Popular