import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'

const StationListItem = ({ station }) => (
    <>
        <Divider light />
        <Typography variant="h4">
            {station.name}
        </Typography>
        <Link to={`/station/${station.id}`}>
            <Typography variant="body1" gutterBottom>
                Bearbeiten
            </Typography>
        </Link>
        <Typography variant="body1" gutterBottom>
            Ort: {station.location}
        </Typography>
    </>
)

StationListItem.propTypes = {
    station: PropTypes.object.isRequired,
}

export default StationListItem
