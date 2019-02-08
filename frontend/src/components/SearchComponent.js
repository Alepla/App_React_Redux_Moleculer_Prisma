import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { FIND_USERS } from '../constants/actionTypes';
import { Search, Grid } from 'semantic-ui-react'

const mapStateToProps = state => ({
    ...state.findUsers,
    users: state.findUsers
});

const mapDispatchToProps = dispatch => ({
    onSearch: (username_contains) =>
        dispatch({ type: FIND_USERS, payload: agent.Users.findUsers(username_contains) })
});
class SearchComponent extends React.Component {
    componentWillMount() {
        this.resetComponent()
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        window.location.href = "http://localhost:4100/user/" + result.title;
    }

    handleSearchChange = (e, { value }) => {
        this.props.onSearch(value);
        this.setState({ isLoading: true, value })
        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
                
            this.setState({
                isLoading: false,
                results: this.props.users.users? this.props.users.users.map((x) => { 
                    let res = {
                        title: x.username,
                        image: x.image,
                        description: x.bio
                    }
                    return res;
                 }): null,
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
