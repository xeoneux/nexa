import {Module} from '@nestjs/common';

import {ConfigService} from './config.service';

@Module({components: [ConfigService], exports: [ConfigService]})
export class ConfigModule {}
