import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { exerciseOptions, fetchData, youtubeOptions } from './../utils/fetchData';
import Details from '../components/Details';
import ExerciseVideos from './../components/ExerciseVedio';
import SimilarExercises from './../components/SimilarExercises';

const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideo] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercise, setEquipmentExercise] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=
      ${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideo(exerciseVideoData.contents);

      const targetMuscleExerciseData =  await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExerciseData);

      
      const equipmentExerciseData =  await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercise(equipmentExerciseData);
    }

    fetchExercisesData();
  }, [id]);

  return (
    <Box>
      <Details exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises TargetMuscleExercises={targetMuscleExercises}
        EquipmentExercise={equipmentExercise}
      />
    </Box>
  )
}

export default ExerciseDetail