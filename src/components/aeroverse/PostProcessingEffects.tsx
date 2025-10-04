import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const PostProcessingEffects = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={2.0}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={300}
        opacity={1}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0015, 0.0015]}
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.02}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
};

export default PostProcessingEffects;
