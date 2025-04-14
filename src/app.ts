import Hapi from '@hapi/hapi';
import hapiJwt from '@hapi/jwt';
import { connectDB } from './config/db';
import { authRoutes } from './routes/auth/auth.routes';
import { adminRoutes } from './routes/admin/admin.routes';
import { validateJWT } from './utils/index';

const init = async () => {
    await connectDB(); // Connection to Database

    const server = Hapi.server({
        port: 3000,
        host: "localhost",
        routes: {
            cors: true
        }
    });

    await server.register(hapiJwt);

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET || 'your-secret-key',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15
        },
        validate: validateJWT
    });

    server.auth.default('jwt');

    server.route([...authRoutes, ...adminRoutes]);

    await server.start();
    console.log(`Server is running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();