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
export const MainVideo: React.FC<{
	audioUrl: string;
	lines?: { text: string; startFrame: number; sceneIndex?: number }[];
	totalFrames?: number;
	title?: string;
	theme?: 'dark' | 'light';
	scenes?: {
		text: string;
		startFrame: number;
		durationFrames: number;
		blocks: {
			type: string;
			icon?: string;
			title?: string;
			subtitle?: string;
			value?: string;
			label?: string;
			left?: { label: string; value: string };
			right?: { label: string; value: string };
		}[];
	}[];
}> = ({
	audioUrl,
	lines = [],
	title = '#1 Warp',
	theme = 'dark',
	scenes = [
		{
			text: "Dummy text",
			startFrame: 0,
			durationFrames: 300,
			blocks: [
				{ type: 'info', icon: '🤖', title: 'Terminal thế hệ mới', subtitle: 'Tích hợp AI Agent' },
				{ type: 'stat', icon: '⭐', value: '48.243', label: 'sao', subtitle: '+8.262 hôm nay' }
			]
		}
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

	// Active Scene Logic
	let currentSceneIndex = 0;
	for (let i = scenes.length - 1; i >= 0; i--) {
		if (frame >= scenes[i].startFrame) { currentSceneIndex = i; break; }
	}
	const currentScene = scenes[currentSceneIndex];
	const sceneAge = frame - currentScene.startFrame;

	// Transitions logic
	const transitionDuration = 15;
	const isExiting = sceneAge > currentScene.durationFrames - transitionDuration;
	const exitProgress = isExiting ? interpolate(sceneAge - (currentScene.durationFrames - transitionDuration), [0, transitionDuration], [0, 1], { extrapolateRight: 'clamp' }) : 0;

	// Theme colors
	const isDark = theme === 'dark';
	const bgColor = isDark ? '#09090b' : '#f8fafc';
	const textColor = isDark ? '#ffffff' : '#0f172a';
	const subTextColor = isDark ? '#a1a1aa' : '#64748b';
	const blockBg = isDark ? 'rgba(24,24,27,0.8)' : 'rgba(255,255,255,0.9)';
	const blockBorder = isDark ? 'rgba(139,92,246,0.3)' : 'rgba(148,163,184,0.3)';
	const primaryColor = isDark ? '#a78bfa' : '#3b82f6';
	const accentColor = '#00d2b4'; // Teal color from user screenshot

	return (
		<AbsoluteFill style={{ backgroundColor: bgColor, fontFamily: "system-ui, -apple-system, sans-serif" }}>
			{/* Audio */}
			{audioUrl && audioUrl.length > 0 && <Audio src={staticFile(audioUrl)} volume={1} />}

			{/* Background Gradient */}
			<div style={{
				position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
				background: isDark ? 'linear-gradient(180deg, rgba(139,92,246,0.15) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(59,130,246,0.1) 0%, transparent 100%)',
			}} />

			{/* ===== TOP HEADER (@DINHPHUONG + Avatar) ===== */}
			<div style={{
				position: 'absolute', top: 60, left: 60, right: 60,
				display: 'flex', justifyContent: 'space-between', alignItems: 'center',
				zIndex: 20, ...fadeSlideUp(frame, 0, 15)
			}}>
				<div style={{
					fontSize: 32, fontWeight: 800, color: accentColor, letterSpacing: 1.5,
					textShadow: `0 0 10px ${accentColor}40`
				}}>
					@YOUR_USERNAME
				</div>
				<Img 
					src={staticFile('logo-placeholder.jpg')} 
					style={{
						width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
						border: `3px solid ${accentColor}`,
						boxShadow: `0 0 15px ${accentColor}60`
					}} 
				/>
			</div>

			{/* ===== MAIN TITLE ===== */}
			<div style={{
				position: 'absolute', top: 220, left: 0, right: 0,
				textAlign: 'center', zIndex: 10,
				...fadeSlideUp(frame, 10, 20)
			}}>
				<div style={{ fontSize: 60, display: 'inline-block', background: isDark ? 'rgba(139,92,246,0.2)' : 'rgba(59,130,246,0.1)', padding: '10px 20px', borderRadius: 20, marginBottom: 20 }}>
					⚡
				</div>
				<h1 style={{ 
					fontSize: 72, fontWeight: 900, color: textColor, margin: 0, 
					textShadow: isDark ? '0 4px 20px rgba(139,92,246,0.5)' : 'none' 
				}}>
					<span style={{ color: primaryColor }}>{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
				</h1>
			</div>

			{/* ===== CENTER BLOCKS ===== */}
			<div style={{
				position: 'absolute', top: 480, left: 60, right: 60,
				display: 'flex', flexDirection: 'column', gap: 24, zIndex: 5
			}}>
				{currentScene && currentScene.blocks && currentScene.blocks.map((block, index) => {
					const staggerFrames = index * 10;
					const enterSpring = spring({
						frame: Math.max(0, sceneAge - staggerFrames),
						fps,
						config: { damping: 14, mass: 0.8, stiffness: 150 }
					});

					const blockOpacity = interpolate(enterSpring, [0, 1], [0, 1]) * (1 - exitProgress);
					const blockY = interpolate(enterSpring, [0, 1], [60, 0]) + (exitProgress * 60);
					const blockScale = interpolate(enterSpring, [0, 1], [0.85, 1]) - (exitProgress * 0.15);

					const iconSpring = spring({ frame: Math.max(0, sceneAge - staggerFrames - 5), fps, config: { damping: 10, mass: 0.5 } });
					const valueSpring = spring({ frame: Math.max(0, sceneAge - staggerFrames - 8), fps, config: { damping: 12, mass: 0.6 } });
					const iconScale = interpolate(iconSpring, [0, 1], [0, 1]);
					const valueSlide = interpolate(valueSpring, [0, 1], [20, 0]);
					const valueOpacity = interpolate(valueSpring, [0, 1], [0, 1]);

					if (block.type === 'comparison') {
						return (
							<div key={index} style={{
								background: blockBg,
								border: `1px solid ${blockBorder}`,
								borderRadius: 24, padding: '40px',
								boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
								opacity: blockOpacity,
								transform: `translateY(${blockY}px) scale(${blockScale})`,
								transformOrigin: 'center center'
							}}>
								<div style={{ fontSize: 36, fontWeight: 800, color: primaryColor, textAlign: 'center', marginBottom: 30 }}>
									{block.title || 'So Sánh'}
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div style={{ textAlign: 'center', flex: 1, opacity: valueOpacity, transform: `translateY(${valueSlide}px)` }}>
										<div style={{ fontSize: 32, fontWeight: 700, color: subTextColor, marginBottom: 10 }}>{block.left?.label}</div>
										<div style={{ fontSize: 48, fontWeight: 900, color: '#fbbf24' }}>{block.left?.value}</div>
									</div>
									<div style={{ 
										width: 60, height: 60, borderRadius: 30, background: 'rgba(251,191,36,0.1)', 
										border: '2px solid #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center',
										fontSize: 24, fontWeight: 800, color: '#fbbf24',
										transform: `scale(${iconScale})`
									}}>
										VS
									</div>
									<div style={{ textAlign: 'center', flex: 1, opacity: valueOpacity, transform: `translateY(${valueSlide}px)` }}>
										<div style={{ fontSize: 32, fontWeight: 700, color: subTextColor, marginBottom: 10 }}>{block.right?.label}</div>
										<div style={{ fontSize: 48, fontWeight: 900, color: primaryColor }}>{block.right?.value}</div>
									</div>
								</div>
							</div>
						);
					}

					return (
						<div key={index} style={{
							background: blockBg,
							border: `1px solid ${blockBorder}`,
							borderRadius: 24, padding: '30px 40px',
							display: 'flex', alignItems: 'center', gap: 30,
							boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
							opacity: blockOpacity,
							transform: `translateY(${blockY}px) scale(${blockScale})`,
							transformOrigin: 'center center'
						}}>
							<div style={{ 
								fontSize: 50, width: 90, height: 90, 
								background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderRadius: 20, 
								display: 'flex', alignItems: 'center', justifyContent: 'center',
								flexShrink: 0,
								transform: `scale(${iconScale})`
							}}>
								{block.icon || '📌'}
							</div>
							
							{block.type === 'info' && (
								<div style={{ flex: 1, opacity: valueOpacity, transform: `translateY(${valueSlide}px)` }}>
									<div style={{ fontSize: 36, fontWeight: 800, color: textColor, marginBottom: 8 }}>{block.title}</div>
									{block.subtitle && <div style={{ fontSize: 24, color: subTextColor }}>{block.subtitle}</div>}
								</div>
							)}
							
							{block.type === 'stat' && (
								<div style={{ flex: 1, opacity: valueOpacity, transform: `translateY(${valueSlide}px)` }}>
									<div style={{ fontSize: 46, fontWeight: 900, color: '#fbbf24', marginBottom: 8 }}>
										{block.value} <span style={{ fontSize: 32, fontWeight: 700, color: textColor }}>{block.label}</span>
									</div>
									{block.subtitle && <div style={{ fontSize: 24, color: subTextColor }}>{block.subtitle}</div>}
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
								fontSize: isHighlight ? 54 : 44,
								fontWeight: isHighlight ? 900 : 700,
								color: isHighlight ? '#ffffff' : 'rgba(255,255,255,0.7)',
								marginBottom: 10,
								lineHeight: 1.3,
								textShadow: isHighlight 
									? '0 4px 12px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,1)' 
									: '0 2px 8px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.8)', // Strong stroke/shadow
							}}>
								{l.text}
							</div>
						);
					})}
				</div>
			</div>

			{/* Progress bar */}
			<div style={{
				position: 'absolute', bottom: 0, left: 0,
				width: `${Math.min(frame / durationInFrames, 1) * 100}%`, height: 8,
				background: `linear-gradient(90deg, ${accentColor}, ${primaryColor})`,
				zIndex: 20,
			}} />
		</AbsoluteFill>
	);
};
