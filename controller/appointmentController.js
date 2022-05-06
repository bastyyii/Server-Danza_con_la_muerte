const AppointmentModel = require('../model/appointmentModel');

exports.getAppointment = async (req, res) => {
    const {month, day, year} = req.params;
    var hours = ['09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'];
    try {
        const reservationsPerDay = await AppointmentModel.find({ $and: [{bookingMonth: month}, {bookingDay: day}, {bookingYear: year}] });
        
        if(reservationsPerDay.length === 0){
            return res.status(200).json({hours, reservationsPerDay});
        }
        if(reservationsPerDay.length > 0){
            reservationsPerDay.map((element) => {
                if(hours.includes(element.bookingHours)){
                    hours.splice(hours.indexOf(element.bookingHours), 1);
                }
            });
            if(hours.length === 0){
                return res.status(402).json({msg: 'No hay horas disponibles este dia'});
            }
            return res.status(200).json({ hours, reservationsPerDay });
        }

    } catch (error) {
        return res.status(500).json({msg: 'Error en el servidor, obtener citas'});
    }
}

exports.createAppointment = async (req, res) => {
    const { month, day, year } = req.params;
    var hours = ['09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'];
    try {
        const actualDate = new Date();
        const [Actualmonth, Actualday] = [actualDate.getMonth(), actualDate.getDay()];

        if(year < 2022 || month < Actualmonth){
            return res.status(402).json({msg: 'La fecha y hora de reserva debe ser posterior a la fecha actual'});
        }
        if(day < Actualday){
            return res.status(402).json({msg: 'Lo siento la muerte es muy estricta, la fecha debe ser posterior a la fecha actual'});
        }
        if(!(hours.includes(req.body.bookingHours))){
            return res.status(402).json({msg: 'Lo siento la muerte es muy estricta, la hora debe estar dentro del horario permitido'});    
        }
        const reservationsPerDay = await AppointmentModel.find({ $and: [{bookingMonth: month}, {bookingDay: day}, {bookingYear: year}]});
        if(reservationsPerDay.length === 0){
            let newReservation = new AppointmentModel(req.body);
            newReservation.bookingHours = req.body.bookingHours;
            newReservation.bookingMonth = month;
            newReservation.bookingDay = day;
            newReservation.bookingYear = year;
            await newReservation.save();
            const reserv = await AppointmentModel.find({ $and: [{bookingMonth: month}, {bookingDay: day}, {bookingYear: year}]});
            return res.status(200).json({reserv});
        }
        let check = false;
        reservationsPerDay.forEach(function(element){
            if(req.body.bookingHours === element.bookingHours){
                check = true;
            }
        });
        if(check){
            return res.status(400).json({msg: 'La hora ya esta reservada'});
        }
        let newReservation = new AppointmentModel(req.body);
        newReservation.bookingHours = req.body.bookingHours;
        newReservation.bookingMonth = month;
        newReservation.bookingDay = day;
        newReservation.bookingYear = year;
        await newReservation.save();
        const reserv = await AppointmentModel.find({ $and: [{bookingMonth: month}, {bookingDay: day}, {bookingYear: year}]});
        return res.status(200).json({reserv});
    } catch (error) {
        return res.status(500).json({msg: 'Error en el servidor, crear cita'});
    }
}
