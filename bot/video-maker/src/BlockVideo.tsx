import React from 'react';
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// ===== ANIMATION HELPERS =====
function fadeSlideUp(frame: number, startAt: number, duration = 15) {
	const age = frame - startAt;
	const opacity = interpolate(age, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const y = interpolate(age, [0, duration], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	return { opacity, transform: `translateY(${y}px)` };
}

// ===== COMPONENT =====
export const BlockVideo: React.FC<{
	audioUrl: string;
	lines?: { text: string; startFrame: number }[];
	totalFrames?: number;
	title?: string;
	blocks?: {
		type: string;
		icon?: string;
		title?: string;
		subtitle?: string;
		value?: string;
		label?: string;
	}[];
}> = ({
	audioUrl,
	lines = [],
	title = '#1 Warp',
	blocks = [
		{ type: 'info', icon: '🤖', title: 'Terminal thế hệ mới', subtitle: 'Tích hợp AI Agent' },
		{ type: 'stat', icon: '⭐', value: '48.243', label: 'Sao tổng cộng' },
		{ type: 'stat', icon: '🦀', value: 'Rust', label: 'Ngôn ngữ lập trình' },
	]
}) => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// ===== CAPTION LOGIC =====
	const LINES_PER_BLOCK = 2; // Show fewer lines at the bottom for readability
	const captionBlocks: { lines: typeof lines; startFrame: number }[] = [];
	for (let i = 0; i < lines.length; i += LINES_PER_BLOCK) {
		const blockLines = lines.slice(i, i + LINES_PER_BLOCK);
		captionBlocks.push({ lines: blockLines, startFrame: blockLines[0]?.startFrame || 0 });
	}

	let currentBlockIndex = 0;
	for (let i = captionBlocks.length - 1; i >= 0; i--) {
		if (frame >= captionBlocks[i].startFrame) { currentBlockIndex = i; break; }
	}
	const currentCaption = captionBlocks[currentBlockIndex] || { lines: [], startFrame: 0 };
	const blockAge = frame - currentCaption.startFrame;
	const slideY = interpolate(blockAge, [0, 8], [20, 0], { extrapolateRight: 'clamp' });
	const blockOpacity = interpolate(blockAge, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

	// Blocks timing (staggered entrance)
	const blockStartDelay = 30; // Wait 1s before showing blocks
	const staggerDelay = 20;

	return (
		<AbsoluteFill style={{ backgroundColor: '#09090b', fontFamily: "system-ui, -apple-system, sans-serif" }}>
			{/* Audio */}
			{audioUrl && audioUrl.length > 0 && <Audio src={staticFile(audioUrl)} volume={1} />}

			{/* Background Gradient */}
			<div style={{
				position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
				background: 'linear-gradient(180deg, rgba(139,92,246,0.15) 0%, transparent 100%)',
			}} />

			{/* ===== HEADER ===== */}
			<div style={{
				position: 'absolute', top: 120, left: 0, right: 0,
				textAlign: 'center', zIndex: 10,
				...fadeSlideUp(frame, 10, 20)
			}}>
				<div style={{ fontSize: 60, display: 'inline-block', background: 'rgba(139,92,246,0.2)', padding: '10px 20px', borderRadius: 20, marginBottom: 20 }}>
					⚡
				</div>
				<h1 style={{ fontSize: 72, fontWeight: 900, color: '#fff', margin: 0, textShadow: '0 4px 20px rgba(139,92,246,0.5)' }}>
					<span style={{ color: '#a78bfa' }}>{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
				</h1>
				<div style={{ fontSize: 24, color: '#a1a1aa', marginTop: 10 }}>warpdotdev / warp</div>
			</div>

			{/* ===== CENTER BLOCKS ===== */}
			<div style={{
				position: 'absolute', top: 380, left: 60, right: 60,
				display: 'flex', flexDirection: 'column', gap: 24, zIndex: 5
			}}>
				{blocks.map((block, index) => {
					const startAt = blockStartDelay + (index * staggerDelay);
					
					return (
						<div key={index} style={{
							background: 'linear-gradient(90deg, rgba(24,24,27,0.8) 0%, rgba(39,39,42,0.8) 100%)',
							border: '1px solid rgba(139,92,246,0.3)',
							borderRadius: 24, padding: '30px 40px',
							display: 'flex', alignItems: 'center', gap: 30,
							boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
							...fadeSlideUp(frame, startAt, 20)
						}}>
							<div style={{ 
								fontSize: 50, width: 90, height: 90, 
								background: 'rgba(255,255,255,0.05)', borderRadius: 20, 
								display: 'flex', alignItems: 'center', justifyContent: 'center' 
							}}>
								{block.icon}
							</div>
							
							{block.type === 'info' && (
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{block.title}</div>
									<div style={{ fontSize: 24, color: '#a1a1aa' }}>{block.subtitle}</div>
								</div>
							)}
							
							{block.type === 'stat' && (
								<div style={{ flex: 1 }}>
									<div style={{ fontSize: 42, fontWeight: 800, color: '#fbbf24', marginBottom: 8 }}>
										{block.value}
									</div>
									<div style={{ fontSize: 24, color: '#a1a1aa' }}>{block.label}</div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* ===== CAPTION (LOWER THIRD) ===== */}
			<div style={{
				position: 'absolute', bottom: 120, left: 40, right: 40,
				textAlign: 'center', zIndex: 20,
				opacity: blockOpacity,
				transform: `translateY(${slideY}px)`,
			}}>
				<div style={{
					display: 'inline-block',
					padding: '20px 40px',
				}}>
					{currentCaption.lines.map((l, idx) => {
						const isHighlight = idx === 0;
						return (
							<div key={idx} style={{
								fontSize: isHighlight ? 60 : 48,
								fontWeight: isHighlight ? 900 : 700,
								color: isHighlight ? '#fff' : 'rgba(255,255,255,0.7)',
								marginBottom: 10,
								lineHeight: 1.2,
								textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,1)', // Strong stroke/shadow
							}}>
								{l.text}
							</div>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
};
