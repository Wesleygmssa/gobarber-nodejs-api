import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    date: Date;
    provider: string;
}

// const appointmentsRepository = new AppointmentsRepository();

class CreateAppointmentService {
    private appointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {

            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        return appointment;
    }
}

export default CreateAppointmentService;