import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPort(3333); // Tránh đụng hàng port 3000 của Web
Config.setConcurrency(2); // Tránh cháy RAM của Mac Mini khi render file nặng
Config.setDelayRenderTimeoutInMilliseconds(300000); // 5 phút timeout cho load audio/ảnh nặng
Config.setCachingEnabled(false); // Tắt cache webpack để tránh lỗi stale bundle
