# -*- coding: utf-8 -*-
"""
Created on Feb 28 2019
@author: J. C. Vasquez-Correa
        Pattern recognition Lab, University of Erlangen-Nuremberg
        Faculty of Engineering, University of Antioquia,
        juan.vasquez@fau.de
"""

from phonet import Phonet
import os

if __name__ == "__main__":

    PATH = os.path.dirname(os.path.abspath(__file__))

    path_results = os.path.join(PATH, "examples")

    if not os.path.exists(path_results):
        os.makedirs(path_results)
    # get the "stop" phonological posterior from a single file
    file_audio = PATH+"/audios/try.wav"
    file_feat = path_results+"/pataka"
    phon = Phonet(["stop"])
    phon.get_phon_wav(file_audio, file_feat, True)

    # get the "nasal" phonological posterior from a single file
    file_audio = PATH+"/audios/try.wav"
    file_feat = path_results+"/sentence_nasal"
    phon = Phonet(["nasal"])
    phon.get_phon_wav(file_audio, file_feat, True)

    # get the "strident" phonological posterior from a single file
    file_feat = path_results+"/sentence_strident"
    phon = Phonet(["strident"])
    phon.get_phon_wav(file_audio, file_feat, True)

    # get "strident, nasal, and back" phonological posteriors from a single file
    file_feat = path_results+"/sentence_all"
    phon = Phonet(["strident", "nasal", "back"])
    phon.get_phon_wav(file_audio, file_feat, True)

    # compute the posteriorgram for an audio_file for different phonological posteriors
    phon = Phonet(["vocalic", "strident", "nasal", "back", "stop", "pause"])
    phon.get_posteriorgram(file_audio)

    # get phonological posteriors from de audio files included in a directory
    directory = PATH+"/phonclasses/"
    phon = Phonet(["vocalic", "strident", "nasal", "back", "stop", "pause"])
    phon.get_phon_path(PATH+"/audios/", path_results)

    # get the PLLR features from an audio file
    phon = Phonet(["all"])
    PLLR = phon.get_PLLR(file_audio, plot_flag=True)
    print(PLLR.head())
