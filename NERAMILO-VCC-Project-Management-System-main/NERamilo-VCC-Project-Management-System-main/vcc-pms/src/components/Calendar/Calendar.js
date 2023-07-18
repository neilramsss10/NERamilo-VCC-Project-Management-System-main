import React, { useState } from 'react';
import Calendar from 'react-calendar';

import '../Calendar/Calendar.css';

const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());
    return (
        <Calendar onChange={onChange} value={value} />
    )
}

export default CalendarComponent;
