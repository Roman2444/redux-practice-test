
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { setActiveFilter } from '../../actions';
import { fetchingFilter } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const { filtersLoadingStatus, filters, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchingFilter(request))
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onActiveClass = (e) => {
        dispatch(setActiveFilter(e.target.name))
    }

    const buttonsData =  filters;

    const colors = {
        all: 'outline-dark',
        fire: 'danger',
        water: 'primary',
        earth: 'secondary',
        wind: 'success',
    }

    const buttons = buttonsData.map(({name, label}) => {
        const active = activeFilter === name;
        const clazz = active ? 'active' : '';
        return (
            <button type="button"
                    className={`btn btn-${colors[name]} ${clazz}`}
                    key={name}
                    name={name}
                    onClick={(e)=> onActiveClass(e)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;