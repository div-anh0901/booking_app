import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from "../../hooks/useFetch";
import React, { useContext, useState } from 'react'
import './reserve.css';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Reserve({ setOpen, hotelId }) {
    const [selectdRooms, setSelectdRooms] = useState([]);
    const { data, loading, error, refetch } = useFetch(`/hotel/rooms/${hotelId}`);
    const { dates } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSelect = (e) => {
        const selectd = e.target.checked;
        const value = e.target.value;
        setSelectdRooms(selectd ? [...selectdRooms, value] : selectdRooms.filter(item => item !== value));
    }

    const handleClick = async () => {
        try {
            await Promise.all(selectdRooms.map((roomId) => {
                console.log(roomId);
                const res = axios.put(`/room/availability/${roomId}`, {
                    dates: alldates
                });
                return res.data;
            }));

            setOpen(false);
            navigate("/");
        } catch (err) {

        }
    }

    const setDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());
        let dates = [];

        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const alldates = setDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => alldates.includes(new Date(date).getTime()));
        return !isFound;
    }

    return (
        <div className='reserve'>
            <div className='rContainer'>
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select your rooms: </span>
                {data.map(item => (
                    <div className='rItem'>
                        <div className='rItemInfo' >
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax"> Max people : {item.maxPeople}</div>
                            <div className="rPrice"> Price : {item.price}</div>
                        </div>
                        <div className='rSelectRooms' >
                            {item.roomNumbers.map(roomNumbers => (
                                <div className='room' >
                                    <label>{roomNumbers.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumbers._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumbers)}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
                <button onClick={handleClick} className='rButton' >Resever Now!</button>
            </div>
        </div>
    )
}

export default Reserve