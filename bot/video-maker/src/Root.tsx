import React from 'react';
import { Composition, getInputProps } from 'remotion';
import { MainVideo } from './MainVideo';
import { BlockVideo } from './BlockVideo';

export const RemotionRoot: React.FC = () => {
	const props = getInputProps() as Record<string, unknown>;
	const totalFrames = Number(props.totalFrames) || 300;

	return (
		<>
			<Composition
				id="MainVideo"
				component={MainVideo}
				durationInFrames={totalFrames}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					audioUrl: '',
					lines: [],
				}}
			/>
			<Composition
				id="BlockVideo"
				component={BlockVideo}
				durationInFrames={totalFrames}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{
					audioUrl: '',
					lines: [],
				}}
			/>
		</>
	);
};
