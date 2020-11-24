
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();



appointmentsRouter.use(ensureAuthenticated); // aplicanto middlewares em todas as rotas

// appointmentsRouter.get('/', async (request, response) => {

//     const appointments = await appointmentRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const appointmentsRepository = new AppointmentsRepository();

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentServices(appointmentsRepository);

    const appointment = await createAppointment.execute({ provider_id, date: parseDate })

    return response.json(appointment);


});


export default appointmentsRouter;