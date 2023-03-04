import React, { Component } from 'react';
import { FormControl, FormLabel, FormControlLabel, FormGroup, Switch, InputLabel, Select, MenuItem, Checkbox, Paper, Button, Menu, MenuList, ButtonGroup, Divider } from '@mui/material';

// Filter UI component. Filtering logic is in RestaurantList.js
class RestaurantFilter extends Component {
    constructor(props) {
        super(props);

        this.state.fltUseTime = false

        // Snapshots the current datetime to set the filter to the next available time.
        var date = new Date()

        // If hours is >= 12, set to pm. Otherwise am.
        this.state.fltMeridiem = date.getHours() >= 12

        this.state.fltHour = date.getHours()

        // Set the minutes to the next 15-interval slot
        // If next slot is 0 min, increment hour too.
        if (date.getMinutes() >= 45) {
            this.state.fltMin = 0
            this.state.fltHour++
        }
        else if (date.getMinutes() >= 30 && date.getMinutes() < 45)
            this.state.fltMin = 45
        else if (date.getMinutes() >= 15 && date.getMinutes() < 30)
            this.state.fltMin = 30
        else if (date.getMinutes() >= 0 && date.getMinutes() < 15)
            this.state.fltMin = 15

        // If next slot is midnight, get tomorrow
        // Otherwise use today
        if (this.state.fltHour === 0 && this.state.fltMin === 0) {
            this.state.fltDay = date.getDay() + 1
            if (this.state.fltDay > 6)
                this.state.fltDay -= 7
        }
        else
            this.state.fltDay = date.getDay()

        // Convert hours from 24-hour format to 12 hour format.
        // Don't condense this with meridiem because they don't follow the same logic.
        if (this.state.fltHour > 12)
            this.state.fltHour = date.getHours() - 12
        else if (this.state.fltHour === 0)
            this.state.fltHour = 12

        // Store these initial values for use with defaultValues of the UI to satisfy some react hook rules
        this.state.initDay = this.state.fltDay
        this.state.initHour = this.state.fltHour
        this.state.initMin = this.state.fltMin
        this.state.initMeridiem = this.state.fltMeridiem

        this.state.fltPrices = new Array(4).fill(true)
        this.state.fltDiets = new Array(4).fill(true)
    }

    state = {
        // Boolean: True if user wants a specific time, False for no open hours check.
        fltUseTime: this.props.fltUseTime,

        // Int values for the day/time the user specifies.
        fltDay: this.props.fltDay,
        fltHour: this.props.fltHour,
        fltMin: this.props.fltMin,
        // Boolean: True if pm, False if am.
        fltMeridiem: this.props.fltMeridiem,

        // Array of 4 booleans. Each element is true for the respective price range value the user is filtering.
        // [is$, is$$, is$$$, is$$$$]
        fltPrices: this.props.fltPrices,

        // Array of (currently 3) booleans. Logic same as fltPrices.
        // [isVegetarian, isVegan, isHalal]
        fltDiets: this.props.fltDiets
    }

    // When Filter button is pressed, send filter attributes up to List.
    onFilter() {
        this.props.onFilter(
            this.state.fltUseTime,
            [this.state.fltDay, this.state.fltHour, this.state.fltMin, this.state.fltMeridiem === true ? 1 : 0],
            this.state.fltPrices,
            this.state.fltDiets)
    }

    // Listeners for the various states
    onTimeSwitchChange() {
        this.setState({ fltUseTime: !this.state.fltUseTime })
    }
    onTimeSetHr(value) {
        this.setState({ fltHour: value })
    }
    onTimeSetMin(value) {
        this.setState({ fltMin: value })
    }
    onMeridiemSwitchChange() {
        this.setState({ fltMeridiem: !this.state.fltMeridiem })
    }
    onTimeSetDay(value) {
        this.setState({ fltDay: value })
    }

    onPriceChange(position) {
        const updatePrices = this.state.fltPrices.map((item, index) =>
            index === position ? !item : item
        );
        this.setState({ fltPrices: updatePrices })
        console.log(this.state)
    }
    onDietChange(position) {
        const updateDiets = this.state.fltDiets.map((item, index) =>
            index === position ? !item : item
        );
        this.setState({ fltDiets: updateDiets })
        console.log(this.state)
    }

    render() {
        return (
            <Paper
                id="filter-sidebar">
                <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={() => { this.onFilter() }}>
                    Filter
                </Button>
                <Divider />
                <FormLabel>Open</FormLabel>
                <span>
                    Anytime
                    <Switch
                        id="time-condition-switch"
                        onClick={() => this.onTimeSwitchChange()} />
                    At...
                </span>
                <span>
                    <Select
                        id="flt-hr-select"
                        IconComponent={null}
                        autoWidth
                        disabled={!this.state.fltUseTime}
                        defaultValue={this.state.initHour}
                        value={this.state.fltHour}
                        onChange={event => { this.onTimeSetHr(event.target.value) }}
                        sx={{
                            width: "25%",
                            display: "inline-block"
                        }}>
                        <MenuItem value={1} dense>1</MenuItem>
                        <MenuItem value={2} dense>2</MenuItem>
                        <MenuItem value={3} dense>3</MenuItem>
                        <MenuItem value={4} dense>4</MenuItem>
                        <MenuItem value={5} dense>5</MenuItem>
                        <MenuItem value={6} dense>6</MenuItem>
                        <MenuItem value={7} dense>7</MenuItem>
                        <MenuItem value={8} dense>8</MenuItem>
                        <MenuItem value={9} dense>9</MenuItem>
                        <MenuItem value={10} dense>10</MenuItem>
                        <MenuItem value={11} dense>11</MenuItem>
                        <MenuItem value={12} dense>12</MenuItem>
                    </Select>
                    <b
                        style={{
                            position: "relative",
                            top: "-24px",
                            margin: "0 8px 0 8px"
                        }}>
                        :
                    </b>
                    <Select
                        id="flt-min-select"
                        IconComponent={null}
                        autoWidth
                        disabled={!this.state.fltUseTime}
                        defaultValue={this.state.initMin}
                        value={this.state.fltMin}
                        onChange={event => { this.onTimeSetMin(event.target.value) }}
                        sx={{
                            width: "25%",
                            display: "inline-block"
                        }}>
                        <MenuItem value={0} dense>00</MenuItem>
                        <MenuItem value={15} dense>15</MenuItem>
                        <MenuItem value={30} dense>30</MenuItem>
                        <MenuItem value={45} dense>45</MenuItem>
                    </Select>
                    <FormControlLabel
                        label={this.state.fltMeridiem ? ("pm") : ("am")}
                        labelPlacement="bottom"
                        control={
                            <Switch
                                id="meridiem-time-form"
                                size="small"
                                disabled={!this.state.fltUseTime}
                                defaultChecked={this.state.initMeridiem}
                                onClick={() => { this.onMeridiemSwitchChange() }} />
                        }
                        sx={{
                            margin: "0 4px 0 4px",
                            position: "relative",
                            top: "-24px"
                        }} />
                </span>
                <Select
                    id="flt-day-select"
                    IconComponent={null}
                    autoWidth
                    disabled={!this.state.fltUseTime}
                    defaultValue={this.state.initDay}
                    value={this.state.fltDay}
                    onChange={event => { this.onTimeSetDay(event.target.value) }}>
                    <MenuItem value={0} dense>Sunday</MenuItem>
                    <MenuItem value={1} dense>Monday</MenuItem>
                    <MenuItem value={2} dense>Tuesday</MenuItem>
                    <MenuItem value={3} dense>Wednesday</MenuItem>
                    <MenuItem value={4} dense>Thursday</MenuItem>
                    <MenuItem value={5} dense>Friday</MenuItem>
                    <MenuItem value={6} dense>Saturday</MenuItem>
                </Select>
                <Divider />
                <FormLabel>Price Range</FormLabel>
                <FormGroup
                    id="price-range-form">
                    <FormControlLabel
                        value="one"
                        label="$"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onPriceChange(0) }} />
                        } />
                    <FormControlLabel
                        value="two"
                        label="$$"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onPriceChange(1) }} />
                        } />
                    <FormControlLabel
                        value="three"
                        label="$$$"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onPriceChange(2) }} />
                        } />
                    <FormControlLabel
                        value="four"
                        label="$$$$"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onPriceChange(3) }} />
                        } />
                </FormGroup>
                <Divider />
                <FormLabel>Dietary Options</FormLabel>
                <FormGroup
                    id="diet-form">
                    <FormControlLabel
                        label="Vegetarian"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onDietChange(0) }} />
                        } />
                    <FormControlLabel
                        label="Vegan"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onDietChange(1) }} />
                        } />
                    <FormControlLabel
                        label="Halal"
                        control={
                            <Checkbox
                                size="small"
                                defaultChecked
                                onChange={() => { this.onDietChange(2) }} />
                        } />
                </FormGroup>
            </Paper >
        );
    }
}

export default RestaurantFilter;