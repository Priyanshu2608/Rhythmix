"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { 
  Home, 
  Search, 
  LibraryIcon, 
  Settings, 
  LogOut, 
  Shuffle, 
  SkipBack, 
  Play, 
  SkipForward, 
  Repeat, 
  Volume2, 
  Heart, 
  Plus, 
  MoreHorizontal 
} from 'lucide-react';
import { NextPage } from 'next';

// Types
type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  imageUrl: string;
  duration: string;
  isNFT: boolean;
};

type Album = {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  isNFT: boolean;
};

type Playlist = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  songCount: number;
};

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
  followers: string;
};

const Library: NextPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSong, setCurrentSong] = useState<Song>({
    id: '1',
    title: 'Ethereal Dreams',
    artist: 'Cosmic Harmony',
    album: 'Celestial Journey',
    imageUrl: 'https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.jpg',
    duration: '3:45',
    isNFT: true
  });
  
  // Sample data
  const recentlyPlayed: Song[] = [
    {
      id: '1',
      title: 'Excuses',
      artist: 'AP Dhillon',
      album: 'Excuses',
      imageUrl: 'https://c.saavncdn.com/890/Excuses-English-2021-20210930112054-500x500.jpg',
      duration: '3:45',
      isNFT: true
    },
    {
      id: '2',
      title: 'Midnight Groove',
      artist: 'Urban Echoes',
      album: 'City Lights',
      imageUrl: '/album-covers/midnight.jpg',
      duration: '4:12',
      isNFT: false
    },
    {
      id: '3',
      title: 'Digital Horizon',
      artist: 'Synth Collective',
      album: 'Future Waves',
      imageUrl: '/album-covers/digital.jpg',
      duration: '3:58',
      isNFT: true
    },
    {
      id: '4',
      title: 'Astral Journey',
      artist: 'Nebula Dreams',
      album: 'Cosmic Voyager',
      imageUrl: '/album-covers/astral.jpg',
      duration: '5:21',
      isNFT: true
    },
  ];
  
  const topAlbums: Album[] = [
    {
      id: '1',
      title: 'Celestial Journey',
      artist: 'Cosmic Harmony',
      imageUrl: '/album-covers/celestial.jpg',
      isNFT: true
    },
    {
      id: '2',
      title: 'City Lights',
      artist: 'Urban Echoes',
      imageUrl: '/album-covers/city.jpg',
      isNFT: false
    },
    {
      id: '3',
      title: 'Future Waves',
      artist: 'Synth Collective',
      imageUrl: '/album-covers/future.jpg',
      isNFT: true
    },
    {
      id: '4',
      title: 'Galactic Bass',
      artist: 'Space Beats',
      imageUrl: '/album-covers/galactic.jpg',
      isNFT: true
    },
    {
      id: '5',
      title: 'Neon Dreams',
      artist: 'Digital Pulse',
      imageUrl: '/album-covers/neon.jpg',
      isNFT: false
    }
  ];
  
  const playlists: Playlist[] = [
    {
      id: '1',
      title: 'Chill Study Vibes',
      description: 'Perfect for focused study sessions',
      imageUrl: '/playlists/study.jpg',
      songCount: 24
    },
    {
      id: '2',
      title: 'Morning Meditation',
      description: 'Start your day with calm',
      imageUrl: '/playlists/meditation.jpg',
      songCount: 15
    },
    {
      id: '3',
      title: 'Workout Intensity',
      description: 'Keep the energy high',
      imageUrl: '/playlists/workout.jpg',
      songCount: 32
    },
    {
      id: '4',
      title: 'Coding Sessions',
      description: 'Focus-enhancing beats',
      imageUrl: '/playlists/coding.jpg',
      songCount: 28
    }
  ];
  
  const artists: Artist[] = [
    {
      id: '1',
      name: 'Cosmic Harmony',
      imageUrl: '/artists/cosmic.jpg',
      followers: '145K'
    },
    {
      id: '2',
      name: 'Urban Echoes',
      imageUrl: '/artists/urban.jpg',
      followers: '92K'
    },
    {
      id: '3',
      name: 'Synth Collective',
      imageUrl: '/artists/synth.jpg',
      followers: '210K'
    },
    {
      id: '4',
      name: 'Nebula Dreams',
      imageUrl: '/artists/nebula.jpg',
      followers: '78K'
    },
    {
      id: '5',
      name: 'Digital Pulse',
      imageUrl: '/artists/digital.jpg',
      followers: '183K'
    },
    {
      id: '6',
      name: 'Space Beats',
      imageUrl: '/artists/space.jpg',
      followers: '126K'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex">
      <Head>
        <title>Library | Rhythmix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
    
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Library</h1>
            
            <div className="flex gap-4">
              <button className="bg-[#7c3aed] text-white px-4 py-2 rounded-full flex items-center">
                <Plus size={16} className="mr-2" />
                Create Collection
              </button>
              <button className="bg-[#7c3aed] text-white px-4 py-2 rounded-full flex items-center">
                Browse Marketplace
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="bg-[#222222] rounded-lg flex items-center px-4 py-3 mb-8 max-w-xl">
            <Search size={20} className="text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search in your library..."
              className="bg-transparent border-none outline-none text-white w-full"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3 mb-8">
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-[#7c3aed] text-white' : 'bg-[#222222] text-gray-300 hover:bg-[#333333]'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'albums' ? 'bg-[#7c3aed] text-white' : 'bg-[#222222] text-gray-300 hover:bg-[#333333]'}`}
              onClick={() => setActiveFilter('albums')}
            >
              Albums
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'playlists' ? 'bg-[#7c3aed] text-white' : 'bg-[#222222] text-gray-300 hover:bg-[#333333]'}`}
              onClick={() => setActiveFilter('playlists')}
            >
              Playlists
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'artists' ? 'bg-[#7c3aed] text-white' : 'bg-[#222222] text-gray-300 hover:bg-[#333333]'}`}
              onClick={() => setActiveFilter('artists')}
            >
              Artists
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'nft' ? 'bg-[#7c3aed] text-white' : 'bg-[#222222] text-gray-300 hover:bg-[#333333]'}`}
              onClick={() => setActiveFilter('nft')}
            >
              NFT Collection
            </button>
          </div>
          
          {/* Recently Played Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recently Played</h2>
              
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-[#333333]">
                  <th className="font-normal text-left py-3 w-8">#</th>
                  <th className="font-normal text-left py-3">Title</th>
                  <th className="font-normal text-left py-3">Album</th>
                  <th className="font-normal text-left py-3">Duration</th>
                  <th className="font-normal text-right py-3"></th>
                </tr>
              </thead>
              <tbody>
                {recentlyPlayed.map((song, index) => (
                  <tr key={song.id} className="border-b border-[#222222] hover:bg-[#1a1a1a]">
                    <td className="py-3 text-gray-400">{index + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-4">
                          <div className="bg-gray-700 rounded w-10 h-10"></div>
                          {song.isNFT && (
                            <div className="absolute top-0 right-0 bg-[#7c3aed] text-xs px-1 rounded">NFT</div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{song.title}</h4>
                          <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-gray-400">{song.album}</td>
                    <td className="py-3 text-gray-400">{song.duration}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-4">
                        <button className="text-gray-400 hover:text-[#7c3aed]">
                          <Heart size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-[#7c3aed]">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          
          {/* Albums Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Albums</h2>
             
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {topAlbums.map(album => (
                <div key={album.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-transform hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-square bg-gray-800"></div>
                    {album.isNFT && (
                      <div className="absolute top-2 right-2 bg-[#7c3aed] bg-opacity-80 text-white text-xs px-2 py-1 rounded">NFT</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-[#7c3aed] bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center">
                        <Play size={24} fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{album.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Playlists Section */}
          <section className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Playlists</h2>
              
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {playlists.map(playlist => (
                <div key={playlist.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#222222] transition-transform hover:-translate-y-1">
                  <div className="relative">
                    <div className="aspect-square bg-gray-800"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-[#7c3aed] bg-opacity-80 rounded-full w-12 h-12 flex items-center justify-center">
                        <Play size={24} fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{playlist.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{playlist.songCount} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Artists Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Artists You Follow</h2>
              <a href="#" className="text-[#7c3aed] text-sm hover:underline">View All</a>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {artists.map(artist => (
                <div key={artist.id} className="text-center">
                  <div className="relative mx-auto w-full aspect-square mb-3">
                    <div className="w-full h-full rounded-full bg-gray-800"></div>
                  </div>
                  <h3 className="font-medium truncate">{artist.name}</h3>
                  <p className="text-sm text-gray-400">{artist.followers} followers</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Now Playing Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#222222] py-3 px-5 flex items-center">
        {/* Current Song Info */}
        <div className="flex items-center w-1/4">
          <div className="w-12 h-12 bg-gray-800 rounded mr-3"></div>
          <div>
            <h4 className="font-medium text-sm">{currentSong.title}</h4>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>
          <button className="ml-4 text-gray-400 hover:text-[#7c3aed]">
            <Heart size={16} />
          </button>
        </div>
        
        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center">
          <div className="flex items-center gap-5 mb-2">
            <button className="text-gray-400 hover:text-white">
              <Shuffle size={18} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipBack size={22} />
            </button>
            <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <Play size={16} fill="black" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <SkipForward size={22} />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Repeat size={18} />
            </button>
          </div>
          
          <div className="flex items-center w-full max-w-lg gap-2">
            <span className="text-xs text-gray-400">0:00</span>
            <div className="flex-1 h-1 bg-[#333333] rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-0 bg-[#7c3aed] rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">0:00</span>
          </div>
        </div>
        
        {/* Volume Control */}
        <div className="w-1/4 flex justify-end items-center gap-2">
          <Volume2 size={18} className="text-gray-400" />
          <div className="w-24 h-1 bg-[#333333] rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;